/**
 * Is this window inside an iframe.
 *
 * Based on:
 *   https://stackoverflow.com/questions/326069/how-to-identify-if-a-webpage-is-being-loaded-inside-an-iframe-or-directly-into-t
 */
export function inIframe() {
    try {
        return window.self !== window.top;
    } catch (e) {
        return true;
    }
}
