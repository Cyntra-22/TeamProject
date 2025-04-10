<script lang="ts">
    import { onMount } from "svelte";
    import { showToast } from '$lib/toast';
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
                    userID = data;
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
                uploadError = false;
    
                
                const reader = new FileReader();
                reader.onload = () => {
                    imagePreview = reader.result as string;
                };
                reader.readAsDataURL(droppedFile);
            } else {
                uploadError = true;
                file = null;
                imagePreview = null;
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
    

    function fileToBase64(file: File): Promise<string> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = error => reject(error);
        });
    }
    
    async function uploadProfilePicture() {
        if (!file) {
            showToast("warning", "Please select a profile image");
            return;
        }
        
        isLoading = true;
        errorMessage = "";
        
        try {
       const base64Image = await fileToBase64(file);
    
            
            const profileData = {
                _id: userID,
                profileImage: base64Image
            };
            
            console.log("Updating profile picture");
    
            
            const response = await fetch("http://localhost:8000/profile/edit", {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}` // Add token if required
                },
                body: JSON.stringify(profileData)
            });
            
            if (response.ok) {
                const data = await response.json();
                console.log("Profile picture updated successfully:", data);
                
                showToast("info", "Profile picture updated successfully!");
            } else {
                const errorData = await response.json();
                errorMessage = errorData.message || "Failed to update profile picture";
                console.error("Error updating profile picture:", errorData);
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
    
    function cancelUpload() {
        file = null;
        imagePreview = null;
    }
    </script>
    
    <style>
        .upload-container {
            width: 50%;
            margin: 0 auto;
            padding: 2rem;
            background: white;
            border-radius: 1rem;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        
        .content-container {
            padding-left: 2.5rem;
        }
    
        .upload-box {
            width: 250px;
            height: 250px;
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
            margin-bottom: 1.5rem;
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
    
        .image-preview {
            max-width: 100%;
            max-height: 100%;
        }
    
        .image-preview img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 8px;
        }
    
        .button-container {
            display: flex;
            gap: 1rem;
            margin-top: 1rem;
        }
    
        .pbtn-2 {
            background-color: hsl(5, 85%, 63%);
            color: white;
            border: none;
            padding: 0.5rem 2rem;
            border-radius: 20px;
            cursor: pointer;
            font-size: 0.8rem;
        }
    
        .pbtn-2:hover {
            background-color: hsl(5, 85%, 50%);
        }
    
        .pbtn-1 {
            background-color: white;
            color: hsl(5, 85%, 63%);
            border: none;
            padding: 0.4rem 2rem;
            border-radius: 20px;
            cursor: pointer;
            border: 1px solid hsl(5, 85%, 63%);
            font-size: 0.8rem;
        }
    
        .pbtn-1:hover {
            color: hsl(5, 85%, 50%);
            border: 1px solid hsl(5, 85%, 50%);
        }
    
        .text {
            margin: 1rem 0;
            font-size: 0.8rem;
        }
    
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
            z-index: 1000;
        }
    
        .error-box {
            background-color: white;
            padding: 2rem;
            border-radius: 8px;
            text-align: center;
            max-width: 400px;
            width: 100%;
            color: hsl(5, 85%, 50%);
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
    
        .title {
            font-size: 1.2rem;
            font-weight: bold;
            margin-bottom: 1.5rem;
        }
    </style>
    
    <div class="upload-container">
        <div class="content-container">
            <div class="title">Update Profile Picture</div>
            
            <div 
                class="upload-box" 
                on:drop={handleDrop} 
                on:dragover={allowDrop}
                on:keydown={handleKeyPress}
                role="button" 
                tabindex="0"
                aria-label="Upload profile picture by clicking or dragging and dropping"
            >
                {#if imagePreview}
                    <div class="image-preview">
                        <img src={imagePreview} alt="Profile picture preview" />
                    </div>
                {:else}
                    <span>Choose a profile picture or drag and drop it here</span>
                {/if}
    
                <input 
                    type="file" 
                    id="fileInput"
                    on:change={handleFileUpload}
                    accept="image/*"
                    aria-hidden="true"
                />
            </div>
            
            <div class="button-container">
                <button type="button" class="pbtn-1" on:click={cancelUpload}>Cancel</button>
                <button type="button" class="pbtn-2" on:click={uploadProfilePicture} disabled={isLoading || !file}>
                    {isLoading ? 'Uploading...' : 'Save'}
                </button>
            </div>
            
            <div class="text">Accepted file types: .jpg, .jpeg, .png, .gif</div>
            
            {#if errorMessage}
                <div class="text" style="color: hsl(5, 85%, 50%);">{errorMessage}</div>
            {/if}
        </div>
        

        {#if uploadError}
            <div class="error-popup">
                <div class="error-box">
                    <div>Invalid file format! Please upload a valid image.</div>
                    <button on:click={resetFileInput}>Try Again</button>
                </div>
            </div>
        {/if}
    </div>