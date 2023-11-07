export interface Member {
    name: string;
    paid: number;
	id: string;
}

export interface Group {
	id: string;
    name: string;
    membersCount: number;
    members: Member[];
    total: number;
}

export interface Data {
    data: Group[];
}

export interface OptionType {
	value: string;
	label: string;
}