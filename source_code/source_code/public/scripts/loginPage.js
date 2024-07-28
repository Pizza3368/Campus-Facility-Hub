document.addEventListener('DOMContentLoaded', function() {
    const boxContainer = document.getElementById('boxContainer');
    const boxTemplate = document.getElementById('boxTemplate').content;

    // Example data array
    const data = [
        { title: 'Box 1', content: 'This is the content of box 1.' },
        { title: 'Box 2', content: 'This is the content of box 2.' },
        { title: 'Box 3', content: 'This is the content of box 3.' }
    ];

    // Function to create and append a box component
    function createBox(data) {
        const boxClone = document.importNode(boxTemplate, true);
        boxClone.querySelector('.box-title').textContent = data.title;
        boxClone.querySelector('.box-content').textContent = data.content;
        boxContainer.appendChild(boxClone);
    }

    // Create boxes for each data item
    data.forEach(item => createBox(item));
});