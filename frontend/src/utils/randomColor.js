export const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    const color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}