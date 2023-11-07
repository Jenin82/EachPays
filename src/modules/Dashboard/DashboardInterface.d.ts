export interface Member {
    name: string;
    paid: number;
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

export interface Action {
	isCreate: boolean;
	isGroup: boolean;
}