<script lang="ts">
import { onMount } from "svelte";
import { showToast } from '$lib/toast';

let title = "";
let description = "";
let tags = "";
let file: File | null = null;
let uploadError = false; 
let imagePreview: string | null = null;  
let isLoading = false;
let errorMessage = "";
let userID: string | null = null;


onMount(async () => {
    const token = localStorage.getItem("token");
    if (token) {
        try {
            const response = await fetch("http://localhost:8000/auth/tokenID", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ token })
            });

            if (response.ok) {
                const data = await response.json();
                userID = data
                console.log("User ID:", userID);
            } else {
                console.error("Failed to fetch user ID", response.status);
            }
        } catch (err) {
            console.error("Error fetching user ID:", err);
        }
    } else {
        console.warn("No token found in localStorage");
    }
});


const validImageFormats = ["image/jpeg", "image/png", "image/gif"];

function handleFileUpload(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
        const selectedFile = target.files[0];
        if (validImageFormats.includes(selectedFile.type)) {
            file = selectedFile;
            uploadError = false;  

           
            const reader = new FileReader();
            reader.onload = () => {
                imagePreview = reader.result as string;  
            };
            reader.readAsDataURL(selectedFile);  
        } else {
            uploadError = true;  
            file = null;  
            imagePreview = null;  
        }
    }
}

function handleDrop(event: DragEvent) {
    event.preventDefault();
    if (event.dataTransfer?.files.length) {
        const droppedFile = event.dataTransfer.files[0];
        if (validImageFormats.includes(droppedFile.type)) {
            file = droppedFile;
            uploadError = false;  // Reset error state if file is valid

            // Create a preview URL for the image
            const reader = new FileReader();
            reader.onload = () => {
                imagePreview = reader.result as string;  // Store image preview
            };
            reader.readAsDataURL(droppedFile);  // Read the file as a data URL
        } else {
            uploadError = true;  // Set error state if file is invalid
            file = null;  // Clear the file in case of error
            imagePreview = null;  // Clear the preview
        }
    }
}

function allowDrop(event: DragEvent) {
    event.preventDefault();
}

function handleKeyPress(event: KeyboardEvent) {
    if (event.key === "Enter" || event.key === " ") {
        document.getElementById("fileInput")?.click();
    }
}

// Helper function to convert file to base64
function fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = error => reject(error);
    });
}

async function publishPost() {
    if (!title || !description || !file) {
        showToast("warning", "Please fill out all fields and upload an image");
        return;
    }
    
    isLoading = true;
    errorMessage = "";
    
    try {
        
        const taggedTopic = tags.split(',').map(tag => tag.trim()).filter(tag => tag);
        
       
        const base64Image = await fileToBase64(file);

        const userId = userID;

      
        const postData = {
            title,
            description,
            taggedTopic,
            postImage: base64Image,
            userId
        };
        
        console.log("postData: ", postData);

       
        const response = await fetch("http://localhost:8000/post/create", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData)
        });
        
        if (response.ok) {
            const data = await response.json();
            console.log("Post created successfully:", data);
            
           
            title = "";
            description = "";
            tags = "";
            file = null;
            imagePreview = null;
            
            
            showToast("info", "Post created successfully!");
           
        } else {
            const errorData = await response.json();
            errorMessage = errorData.message || "Failed to create post";
            console.error("Error creating post:", errorData);
        }
    } catch (error) {
        console.error("Unexpected error:", error);
        errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
    } finally {
        isLoading = false;
    }
}


function resetFileInput() {
    file = null;
    uploadError = false;
    imagePreview = null;  
}


   
</script>

<style>
    .create-post-container {
        padding: 2rem;
        background: white;
        width: 100%;
    }

    .header {
        font-size: 1.5rem;
        font-weight: bold;
        margin-bottom: 3rem;
        
        display: flex;
        justify-content: space-between;
    }

    .form-container {
        display: flex;
        gap: 2rem;
        padding: 0 3rem;
        
    }

    .upload-box {
        width: 250px;
        height: 350px;
        border: 2px dashed #ccc;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        font-size: 0.9rem;
        color: #666;
        cursor: pointer;
        position: relative;
    }

    .upload-box:hover {
        border-color: black;
    }

    .upload-box input {
        position: absolute;
        opacity: 0;
        width: 100%;
        height: 100%;
        cursor: pointer;
    }

    .form-fields {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    input, textarea {
        width: 90%;
        padding: 0.75rem;
        border: 1px solid #ddd;
        border-radius: 0.7rem;
        font-size: 1rem;
        margin: 1rem 0;
    }

    .image-preview {
        max-width: 100%;
        max-height: auto;
      
    }

    .image-preview img {
        width: 100%;
        height: auto;
        object-fit: contain;
        border-radius: 8px;
    }

    .publish-btn {
        background-color: hsl(5, 85%, 63%);
        color: white;
        padding: 0.5rem 3rem;
        border: none;
        border-radius: 3rem;
        font-size: 1rem;
        cursor: pointer;
        align-self: flex-start;
    }

    .publish-btn:hover {
        background-color: hsl(5, 85%, 50%);
    }

    /* Add some styles for the error popup */
    .error-popup {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        color: hsl(5, 85%, 50%);
    }

    .error-box {
        background-color: white;
        padding: 2rem;
        border-radius: 8px;
        text-align: center;
        max-width: 400px;
        width: 100%;
    }

    .error-box button {
        background-color: hsl(5, 85%, 50%);
        color: white;
        border: none;
        padding: 0.5rem 2rem;
        margin-top: 1rem;
        border-radius: 20px;
        cursor: pointer;
    }

    .error-box button:hover {
        background-color: hsl(5, 85%, 50%);
        color: white;
    }

</style>

<div class="create-post-container">
    <div class="header">
        <div>Create Your Post Here!</div>
        <div><button class="publish-btn" on:click={publishPost}>Publish</button></div>
    </div>
    <div class="form-container">
        
        <div 
            class="upload-box" 
            on:drop={handleDrop} 
            on:dragover={allowDrop}
            on:keydown={handleKeyPress}
            role="button" 
            tabindex="0"
            aria-label="Upload file by clicking or dragging and dropping"
        >
            {#if file}
                <div class="image-preview">
                    <img src={imagePreview} alt="Preview of uploaded artwork"  />
                </div>
            {:else}
                <span>Choose a file or drag and drop it here</span>
            {/if}

            <input 
                type="file" 
                id="fileInput"
                on:change={handleFileUpload}
                accept="image/*"
                aria-hidden="true"
            />
        </div>

       
        <div class="form-fields">
            <label>
                Title <br>
                <input type="text" bind:value={title} placeholder="Add a title" />
            </label>

            <label>
                Description <br>
                <textarea bind:value={description} placeholder="Add a detailed description"></textarea>
            </label>

            <label>
                Tagged topics<br>
                <input type="text" bind:value={tags} placeholder="Search for a tag" />
            </label>
        </div>
    </div>

   
    {#if uploadError}
        <div class="error-popup">
            <div class="error-box">
                <div>Invalid file format! Please upload a valid image.</div>
                <button on:click={resetFileInput}>Upload Again</button>
            </div>
        </div>
    {/if}
</div>


