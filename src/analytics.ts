export default function createAnalytics(): object
{
    let counter = 0;
    let isDestroyed = false;

    const listener = (): number => counter++;

    document.addEventListener( 'click', listener );

    return {
        destroy()
        {
            document.removeEventListener( 'click', listener );
            isDestroyed = true;
        },

        getClicks()
        {
            return isDestroyed ? 'Analytics is destroyed' : counter;
        }
    }
}

window['analytics'] = createAnalytics();