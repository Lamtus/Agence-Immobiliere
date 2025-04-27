import { Categorie } from "./categorie";
import { TypeBien } from "./type-bien";

export class Annonce {
    constructor(
        public id: number,
        public titre: string,
        public description: string,
        public superficie: number,
        public pieces: number,
        public localisation: string,
        public prix: number,
        public photos: string[],
        public contact: string,
        public typeBien: string,
        public categorie: string
    ) {}

    // Méthode pour convertir en objet à envoyer au backend
    toBackendObject(): any {
        return {
            id: this.id,
            titre: this.titre,
            description: this.description,
            superficie: this.superficie,
            nombre_de_pieces: this.pieces,
            localisation: this.localisation,
            prix: this.prix,
            photos: this.photos,
            contact: this.contact,
            typeBien: this.typeBien,
            categorie: this.categorie
        };
    }

    // Méthode statique pour créer un objet Annonce à partir d'une réponse backend
    static fromBackendObject(data: any): Annonce {
        return new Annonce(
            data.id,
            data.titre || '',
            data.description || '',
            data.superficie || 0,
            data.nombre_de_pieces || 0,
            data.localisation || '',
            data.prix || 0,
            data.photos || [],
            data.contact || '',
            data.typeBien || '',
            data.categorie || ''
        );
    }
}
