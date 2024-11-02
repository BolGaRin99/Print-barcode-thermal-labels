document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('image-input').addEventListener('change', handleImageUpload);
    document.getElementById('image-label-size').addEventListener('change', resizePreviewArea);
    document.getElementById('image-print-button').addEventListener('click', printImage);

    let img = null;

    function handleImageUpload() {
        const file = document.getElementById('image-input').files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                img = new Image();
                img.onload = function() {
                    resizeAndPreviewImage();
                }
                img.src = e.target.result;
            }
            reader.readAsDataURL(file);
        }
    }

    function resizePreviewArea() {
        if (img) {
            resizeAndPreviewImage();
        }
    }

    function resizeAndPreviewImage() {
        const imagePreview = document.getElementById('image-preview');
        const [width, height] = document.getElementById('image-label-size').value.split('x').map(Number);
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = width * 3.77953;
        canvas.height = height * 3.77953;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        imagePreview.innerHTML = '';
        imagePreview.appendChild(canvas);
    }

    function printImage() {
        const canvas = document.querySelector('#image-preview canvas');
        if (canvas) {
            const dataUrl = canvas.toDataURL();
            const printWindow = window.open('', '', 'width=800,height=600');
            printWindow.document.write('<html><head><title>Друк зображення</title>');
            printWindow.document.write('</head><body>');
            printWindow.document.write(`<img src="${dataUrl}" />`);
            printWindow.document.write('</body></html>');
            printWindow.document.close();
            printWindow.onload = function() {
                printWindow.print();
                printWindow.close();
            }
        } else {
            alert('No image to print.');
        }
    }

    updatePrintArea();
    resizePreviewArea();
});