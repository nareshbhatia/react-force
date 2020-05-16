/**
 * Resizes a canvas to the specified width and height.
 * There is no return value, the supplied canvas is directly modified.
 *
 * Based on:
 *   https://github.com/viliusle/Hermite-resize
 *   https://github.com/calvintwr/Hermite-resize
 */
function resizeCanvas(
    canvas: HTMLCanvasElement,
    dstWidth: number,
    dstHeight: number
) {
    const srcWidth = canvas.width;
    const srcHeight = canvas.height;

    const srcImageData = canvas
        .getContext('2d')!
        .getImageData(0, 0, srcWidth, srcHeight);
    const dstImageData = canvas
        .getContext('2d')!
        .getImageData(0, 0, dstWidth, dstHeight);

    // Resize
    resizeImageData(
        srcImageData,
        srcWidth,
        srcHeight,
        dstImageData,
        dstWidth,
        dstHeight
    );

    // Put results back in canvas
    canvas.getContext('2d')!.clearRect(0, 0, dstWidth, dstHeight);
    canvas.width = dstWidth;
    canvas.height = dstHeight;
    canvas.getContext('2d')!.putImageData(dstImageData, 0, 0);
}

function resizeImageData(
    srcImageData: ImageData,
    srcWidth: number,
    srcHeight: number,
    dstImageData: ImageData,
    dstWidth: number,
    dstHeight: number
) {
    const srcData = srcImageData.data;
    const dstData = dstImageData.data;

    const ratioW = srcWidth / dstWidth;
    const ratioH = srcHeight / dstHeight;
    const ratioWHalf = Math.ceil(ratioW / 2);
    const ratioHHalf = Math.ceil(ratioH / 2);

    for (let j = 0; j < dstHeight; j++) {
        for (let i = 0; i < dstWidth; i++) {
            const x2 = (i + j * dstWidth) * 4;
            let weight = 0;
            let weights = 0;
            let gx_r = 0;
            let gx_g = 0;
            let gx_b = 0;
            let gx_a = 0;
            const center_y = (j + 0.5) * ratioH;
            for (let yy = Math.floor(j * ratioH); yy < (j + 1) * ratioH; yy++) {
                const dy = Math.abs(center_y - (yy + 0.5)) / ratioHHalf;
                const center_x = (i + 0.5) * ratioW;
                const w0 = dy * dy; // pre-calc part of w
                for (
                    let xx = Math.floor(i * ratioW);
                    xx < (i + 1) * ratioW;
                    xx++
                ) {
                    let dx = Math.abs(center_x - (xx + 0.5)) / ratioWHalf;
                    const w = Math.sqrt(w0 + dx * dx);
                    if (w >= -1 && w <= 1) {
                        // hermite filter
                        weight = 2 * w * w * w - 3 * w * w + 1;
                        if (weight > 0) {
                            dx = 4 * (xx + yy * srcWidth);
                            gx_r += weight * srcData[dx];
                            gx_g += weight * srcData[dx + 1];
                            gx_b += weight * srcData[dx + 2];
                            gx_a += weight * srcData[dx + 3];
                            weights += weight;
                        }
                    }
                }
            }

            dstData[x2] = gx_r / weights;
            dstData[x2 + 1] = gx_g / weights;
            dstData[x2 + 2] = gx_b / weights;
            dstData[x2 + 3] = gx_a / weights;
        }
    }
}

function canvasToBlob(canvas: HTMLCanvasElement): Promise<Blob> {
    return new Promise((resolve) => {
        canvas.toBlob(function (blob) {
            if (blob) {
                return resolve(blob);
            } else {
                throw new Error('Error converting Canvas to Blob');
            }
        });
    });
}

export const ImageUtils = {
    resizeCanvas,
    canvasToBlob,
};
