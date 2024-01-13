const getDestinationX = (n) => {
    let x
    [...Array(10).keys()].forEach(value => {
        if(9 * value == n) {
            x = 0
        }
    })

    if(n < 9) {
        x = n
    }else if(n < 18) {
        x = n - 9
    }else if(n < 27) {
        x = n - 18
    }else if(n < 36) {
        x = n - 27
    }else if(n < 45) {
        x = n - 36
    }else if(n < 54) {
        x = n - 45
    }else if(n < 63) {
        x = n - 54
    }else if(n < 72) {
        x = n - 63
    }else if(n < 81) {
        x = n - 72
    }else {
        x = n - 81
    }
    return x
}

const getDestinationY = (n) => {
    let y
    if(n < 9) {
        y = 0
    }else if(n < 18) {
        y = 1
    }else if(n < 27) {
        y = 2
    }else if(n < 36) {
        y = 3
    }else if(n < 45) {
        y = 4
    }else if(n < 54) {
        y = 5
    }else if(n < 63) {
        y = 6
    }else if(n < 72) {
        y = 7
    }else if(n < 81) {
        y = 8
    }else {
        y = 9
    }
    return y
}

export { getDestinationX, getDestinationY }