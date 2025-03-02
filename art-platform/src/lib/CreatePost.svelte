<script lang="ts">
let title = "";
let description = "";
let tags = "";
let file: File | null = null;
let uploadError = false;  // State to manage error status
let imagePreview: string | null = null;  // State to store the image preview URL

// Valid image formats (add more formats as needed)
const validImageFormats = ["image/jpeg", "image/png", "image/gif"];

function handleFileUpload(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
        const selectedFile = target.files[0];
        if (validImageFormats.includes(selectedFile.type)) {
            file = selectedFile;
            uploadError = false;  // Reset error state if file is valid

            // Create a preview URL for the image
            const reader = new FileReader();
            reader.onload = () => {
                imagePreview = reader.result as string;  // Store image preview
            };
            reader.readAsDataURL(selectedFile);  // Read the file as a data URL
        } else {
            uploadError = true;  // Set error state if file is invalid
            file = null;  // Clear the file in case of error
            imagePreview = null;  // Clear the preview
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

function publishPost() {
    console.log("Publishing Post", { title, description, tags, file });
}

// Function to reset the file input in case of error
function resetFileInput() {
    file = null;
    uploadError = false;
    imagePreview = null;  // Clear the image preview
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
        <!-- File Upload Area -->
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
                    <img src={imagePreview} alt="Image Preview"  />
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

        <!-- Post Details Form -->
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

    <!-- Error Popup -->
    {#if uploadError}
        <div class="error-popup">
            <div class="error-box">
                <div>Invalid file format! Please upload a valid image.</div>
                <button on:click={resetFileInput}>Upload Again</button>
            </div>
        </div>
    {/if}
</div>


