export type Employee = {
	id?: number;
	name: string;
	surname: string;
	phone: string;
	departmentId?: number;
};

export type Department = {
	id?: number;
	name: string;
	employees?: Employee[];
};

export type ErrorProps = {
	message: string | null;
	onClose: () => void;
};

// I implemented a typed frontend using TypeScript to improve maintainability and reduce runtime errors.
