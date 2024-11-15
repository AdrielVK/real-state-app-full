import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/auth';
import { ResponseClass } from 'src/config';
import { CreatePropertyDto, CreatePublicationDto, FeatureDto, FeatureOfPropDto, FeatureToPostDto, ImageDto, PricesDto, PropertyDto, VideoDto } from './post.dto';
import { PostRepository } from 'src/database/prisma/post.repository';
import { FeatureOfPropertyResponseInterface, FeatureResponseInterface, GetPropertyResponseInterface, PropertyResponseInterface, PublicationResponseInterface, ResponseInterface } from 'src/interfaces';
import { Property } from '@prisma/client';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class PostService extends ResponseClass {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly postRepository: PostRepository,
        private readonly cloudinaryService:CloudinaryService,
    ){super()}

    async getFeaturesList(): Promise<ResponseInterface<FeatureDto[]>>{
        const features = await this.postRepository.obtainFeatures()
        if (!features) return this.badRequest('Error al obtener las caracteristicas')
        
        return this.success(features)
    }

    async getFeaturesOfPostById(id_prop:number): Promise<FeatureOfPropDto[]> {
        const features = await this.postRepository.findFeaturesOfPropById(id_prop)

       

        let result:FeatureOfPropDto[] = [];


        for (let ft of features){
            
        
            let primitiveFt = await this.postRepository.findFeatureById(ft.featureId)
            

            let feature:FeatureOfPropDto = {
                id: ft.id,
                featureName: primitiveFt.name,
                quantity: ft.quantity,
                unit: primitiveFt.unit
            };

            result.push(feature)
        }

        
        return result


    }

    async getProperty(id_prop: number): Promise<ResponseInterface<GetPropertyResponseInterface>> {
        const property = await this.postRepository.findProperty(id_prop);
        
        
        const author = await this.userRepository.findById(property.userId);
        
        const type = await this.postRepository.findTypeById(property.typeId);
        const features = await this.getFeaturesOfPostById(id_prop);
        
        

        let featuresResponse: FeatureOfPropertyResponseInterface[] = [];
        for (const ft of features) {
            let ftRes: FeatureOfPropertyResponseInterface = {
                id: ft.id,
                feature: { name: ft.featureName },
                quantity: ft.quantity,
            };
            featuresResponse.push(ftRes);
        }
    
        const propertyResponse: PropertyResponseInterface = {
            id: property.id,
            province: property.province,
            city: property.city,
            street: property.street,
            streetId: property.streetId,
            addId: property.addId,
            state: property.state,
            
            user: {
                id: author.id,
                name: author.name,
                lastname: author.lastname,
                email: author.email,
                phoneNumber: author.phoneNumber,
                role: author.role,
                profilePic: author.profilePic,
                biography: author.biography,
                disclaimer: author.disclaimer
            },
            type: {
                id: type.id,
                name: type.name
            },
            features: featuresResponse
        };

        
    
        return this.success({ data: propertyResponse });
    }

    async createProperty(data:CreatePropertyDto, id_user:number){
        
        let propObj:PropertyDto ={
            province: data.province,
            city: data.city,
            street: data.street,
            streetId:data.streetId || null,
            addId: data.addId || null,
            state: 'AVAILABLE',
            typeName: data.typeName,
            latitude:data.latitude,
            longitude:data.longitude,
            userId: id_user
        }

        const property = await this.postRepository.createProperty(propObj)
        
        

        if (!property) return this.badRequest('Error al crear la propiedad')
        
        const id_prop = (await property).id

        const features:FeatureToPostDto[] = data.features

        

        for (const item of features) {
            let ft = await this.postRepository.findFeature(item.featureName);
            if (!ft){
                return this.forbidden({message:'Caracteristica no disponible,cree una nueva para disponerla'})
            }
   
            await this.postRepository.createFeatureOfProp(item.quantity,ft.id,id_prop)

        }

        return await this.getProperty(id_prop)
    }


    async createPublication(req_data:CreatePublicationDto): Promise<ResponseInterface<PublicationResponseInterface>>
    {   
        const property = await this.postRepository.findProperty(req_data.propertyId) 
        if (!property) return this.forbidden({message:'No ha seleccionado una propiedad, seleccione o cree una'})

        const publication = await this.postRepository.createPublication(req_data)
        if (!property) return this.forbidden({message:'No ha podido crear la publicacion'})
        
        let images:ImageDto[] = []; 

        for (let img of req_data.images) {
            let url_img = (await this.cloudinaryService.uploadImage(img)).imageUrl 
            if (url_img){
                let imageObject = await this.postRepository.createImage(url_img, publication.id)
                if (imageObject){
                    images.push(imageObject)
                }
            }
        }   

        let videos:VideoDto[] = []; 

        for (let vid of req_data.videos){
            let url_vid = (await this.cloudinaryService.uploadImage(vid)).imageUrl 
            if (url_vid){
                let videoObject = await this.postRepository.createVideo(url_vid, publication.id)
                if (videoObject){
                    videos.push(videoObject)
                }
            }
        }

        let prices:PricesDto[] = []

        for (let price of req_data.prices){
            let priceOfPub = await this.postRepository.createPrice(publication.id, price)
            if (priceOfPub){
                prices.push(priceOfPub)
            } 
        }

        const author = await this.userRepository.findById(property.userId);
        const type_prop = await this.postRepository.findTypeById(property.typeId)
        const features_prop = await this.postRepository.findFeaturesOfPropById(property.id)

        let response_features_prop:FeatureOfPropertyResponseInterface[] = [];

        for (let ft of features_prop){
            response_features_prop.push({
                id:ft.id,
                quantity: ft.quantity,
                feature: {name: (await this.postRepository.findFeatureById(ft.featureId)).name}
            })
        }

        const propertyResponse: PropertyResponseInterface = {
            id: property.id,
            province: property.province,
            city: property.city,
            street: property.street,
            streetId: property.streetId,
            addId: property.addId,
            state: property.state,
            
            user: {
                id: author.id,
                name: author.name,
                lastname: author.lastname,
                email: author.email,
                phoneNumber: author.phoneNumber,
                role: author.role,
                profilePic: author.profilePic,
                biography: author.biography,
                disclaimer: author.disclaimer
            },
            type: {
                id: type_prop.id,
                name: type_prop.name
            },
            features: response_features_prop
        };

        const responseData:PublicationResponseInterface = {
            property:propertyResponse,
            title: req_data.title,
            description: req_data.description,
            images:images,
            videos:videos,
            operation:req_data.operationName,
            prices:prices
        }

        return this.success(responseData)

    }
}
