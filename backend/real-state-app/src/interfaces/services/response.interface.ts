export type TypeData = '' | 'WARN' | 'ERROR' | 'SUCCESS' | 'INFO';
export interface ResponseInterface<T> {
  code?: number;
  message?: string;
  payload?: T;
  errors?: string[];
  data?: DataInterface[];
}

export interface DataInterface {
  message?: string;
  type?: TypeData;
  monitoringCode?: string;
}

export interface ExceptionTemplateArgsInterface {
  code: string;
  args?: Args[];
}

interface Args {
  key: string;
  value: string;
}
