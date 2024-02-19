export const fadeOut = (callback: (num: number) => void) => {
    let opacity = 255;
    const timer = setInterval(function () {
        if (opacity <= 0){
            clearInterval(timer);
            callback(0);
        }
        callback(opacity);
        opacity = opacity - 20
    }, 50);
}