<script lang="ts">
    let title = "";
    let description = "";
    let tags = "";
    let file: File | null = null;

    function handleFileUpload(event: Event) {
        const target = event.target as HTMLInputElement;
        if (target.files && target.files.length > 0) {
            file = target.files[0];
        }
    }

    function handleDrop(event: DragEvent) {
        event.preventDefault();
        if (event.dataTransfer?.files.length) {
            file = event.dataTransfer.files[0];
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
</style>

<div class="create-post-container">
    <div class="header"><div>Create Your Post Here!</div>
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
                <span>{file.name}</span>
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
</div>
