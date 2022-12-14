
/** An interface that all playable animations adhere to. */
export interface IPlayableAnimation {
    /** A unique internal ID for the animation. Need to ensure that two animations that do the same thing have a different signature for*
    * * the Animation Manager. */
    _id: number;

    /** Internal callback function that is called when the animation is complete to notify dependancies. */
    _onComplete: () => void;

    /** Internal callback function that is called when the animation progress changes. */
    _onAnimationProgress(timestamp: number): void;

    /** Disposes the animation. */
    dispose(): void;

    /** Gets the duration of the animation. Returns Infinity if the animations loops forever. */
    getDuration(): number;

    /** Checks to see if the animaiton is playing.  */
    isPlaying(): boolean;

    /** Pauses the animation. */
    pause(): void;

    /** Plays the animation. */
    play(): void;

    /** Reset the animation. */
    reset(): void;

    /** Stops the animation. */
    stop(): void;
}
