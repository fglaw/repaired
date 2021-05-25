const previewImageOnFileSelect = () => {
    // we select the photo input
    const input = document.getElementById('photos-input');
    if (input) {
      // we add a listener to know when a new picture is uploaded
      input.addEventListener('change', () => {
        // we call the displayPreview function (who retrieve the image url and display it)
        displayPreview(input);
      })
    }
  }
  
  const displayPreview = (input) => {
    if (input.files) {
        const filesAmount = input.files.length;
        console.log('input.files:', input.files);
        for(var i = 0; i < filesAmount; i++) {
          const reader = new FileReader();

          reader.onload = (event) => {
            var img = document.createElement('img');
            img.height = 200;
            img.width = 400;
            img.src = event.currentTarget.result;
            document.getElementById('photos').appendChild(img);
          }
          reader.readAsDataURL(input.files[i]);
          document.getElementById('photos-preview').classList.remove('hidden');
        }
    };
  }
  
  export { previewImageOnFileSelect };
