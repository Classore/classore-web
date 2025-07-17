export const TypingIndicator = () => {
	return (
		<div className="flex justify-start">
			<div className="flex gap-x-2 text-lg text-neutral-300">
				<span className="animate-bounce">•</span>
				<span className="animate-bounce" style={{ animationDelay: "0.2s" }}>
					•
				</span>
				<span className="animate-bounce" style={{ animationDelay: "0.3s" }}>
					•
				</span>
				<span className="animate-bounce" style={{ animationDelay: "0.4s" }}>
					•
				</span>
				<span className="animate-bounce" style={{ animationDelay: "0.5s" }}>
					•
				</span>
			</div>
		</div>
	);
};
