function Slide({ image, fadeIn, fadeOut }: { image: string; fadeIn: boolean; fadeOut: boolean }) {
    let className = 'absolute h-screen w-full opacity-0';
    if (fadeIn) className = 'absolute h-screen w-full animate-fade-in-picture opacity-0';
    if (fadeOut) className = 'absolute h-screen w-full animate-fade-out-picture opacity-0';
    return (
        <div
            className={className}
            style={{
                backgroundImage: `url(${image})`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center center',
                backgroundSize: 'contain',
            }}
        />
    );
}

export default Slide;
