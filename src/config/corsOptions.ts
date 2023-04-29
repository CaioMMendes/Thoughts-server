interface CorsOptions {
  origin: string[];
  optionsSuccessStatus: number;
  credentials: boolean;
}

export const corsOptions: CorsOptions = {
  origin: [
    process.env.ACEPTEDROUTES1 as string,
    process.env.ACEPTEDROUTES2 as string,
  ],
  optionsSuccessStatus: 200,
  credentials: true,
};
