export const Spinner = () => {
  return (
    <div>
      <div className="fixed w-[80px] h-[80px] top-[calc(50%-40px)] left-[calc(50%-40px)] z-10">
        <div className="animate-lds-ripple self-center rounded-full border border-secondary-700 absolute" />
        <div className="animate-lds-ripple self-center rounded-full border border-secondary-700 absolute [animation-delay: -0.5s]" />
      </div>
    </div>
  );
};
