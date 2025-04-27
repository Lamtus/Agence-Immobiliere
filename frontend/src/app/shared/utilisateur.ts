export class Utilisateur {
    constructor(
        public id: number,
        public nom: string,
        public email: string,
        public motDePasse: string,
        public role: string
      ) {}
}
