export const fadeIn = (callback: (num: number) => void) => {
    let opacity = 0;  // initial opacity
    const timer = setInterval(function () {
        if (opacity >= 255){
          clearInterval(timer);
          callback(255);
        }
        callback(opacity);
        opacity = opacity + 20
    }, 50);
}