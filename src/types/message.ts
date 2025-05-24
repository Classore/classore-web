import type { Maybe, BaseProps } from "./";

export type RoomProps = BaseProps & {
	copied_from: Maybe<string>;
	name: Maybe<string>;
	media: [];
	members: string[];
	is_group: "NO" | "YES";
	description: Maybe<string>;
};

export type MessageProps = BaseProps & {
	content: string;
	sender: {
		id: string;
		first_name: string;
		last_name: string;
		profile_image: string;
		email: string;
		phone_number: Maybe<string>;
	};
	media: string[];
	room: string;
};
