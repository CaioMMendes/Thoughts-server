interface CorsOptions {
  origin: string[];
  optionsSuccessStatus: number;
  credentials: boolean;
  methods: string[];
}

export const corsOptions: CorsOptions = {
  origin: [
    process.env.ACEPTEDROUTES1 as string,
    process.env.ACEPTEDROUTES2 as string,
  ],
  methods: ["GET", "POST"],
  optionsSuccessStatus: 200,
  credentials: true,
};
