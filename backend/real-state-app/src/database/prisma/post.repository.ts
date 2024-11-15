import { Injectable } from '@nestjs/common';
import { Prisma as PrismaService } from './prisma.service';
import { CreatePublicationDto, FeatureDto, FeatureOfPropDto, PricesDto, PropertyDto, TypeDto } from 'src/post';
import { Feature, FeatureOfProp, Image, Operation, Price, Property, Publication, Type, Video } from '@prisma/client';


@Injectable()
export class PostRepository {
    constructor(private readonly prisma: PrismaService) {}

    async obtainFeatures(): Promise<Feature[] | null> {
        return this.prisma.feature.findMany()
    }

    async findProperty(id:number): Promise <Property | null> {
        return this.prisma.property.findUnique({where: {id}})
    }

    async findType(name:string): Promise<Type | null>{
        return this.prisma.type.findUnique({where: {name}})
    }

    async findFeatureById(id:number): Promise<Feature | null>{
        return this.prisma.feature.findUnique( {where: {id}})

    }

    async findFeature(name:string): Promise<Feature | null>{
        return this.prisma.feature.findUnique( {where: {name}})
    }

    async findTypeById(id:number): Promise<Type | null>{
        return this.prisma.type.findUnique( {where: {id}})
    }

    async createType(name:string):Promise<Type> {
        return this.prisma.type.create({data: {name:name}})
    }

    async createFeature(data:FeatureDto): Promise<Feature>{
        return this.prisma.feature.create({data})
    }


    async createFeatureOfProp(quantity:string,ft_id:number, id_prop:number): Promise<FeatureOfProp> {
        
        return this.prisma.featureOfProp.create({
            data:{
                quantity: quantity,
                featureId: ft_id,
                propId: id_prop
            }
        })
    }   

    async findFeaturesOfPropById(id_prop:number): Promise<FeatureOfProp[]>{
        return this.prisma.featureOfProp.findMany({where:{propId:id_prop}}) 
    }

    async createProperty(data:PropertyDto): Promise<Property>{
        let type = await this.findType(data.typeName)
        if (!type) {
            type = await this.createType(data.typeName)
        }

        return this.prisma.property.create(
            {data: {
                province: data.province,
                city: data.city,
                street: data.street,
                streetId: data.streetId || null,   
                addId: data.addId || null,         
                typeId: type.id,
                userId: data.userId,
                longitude: data.longitude,
                latitude: data.latitude
            }}                   
        )
    }

    async findOperationByName(name:string): Promise<Operation|null>{
        return this.prisma.operation.findUnique({where:{name}})
    }

    async CreateOperation(name:string): Promise<Operation|null>{
        return this.prisma.operation.create({data:{name}})
    }

    async createPublication(req:CreatePublicationDto): Promise<Publication>{
        let operation = await this.findOperationByName(req.operationName)
        if (!operation) {
            operation = await this.CreateOperation(req.operationName)
        }
        return this.prisma.publication.create({
            data: {
                title: req.title,
                description: req.title,
                propertyId: req.propertyId,
                operationId: operation.id,
                images: null,
                videos: null,
                prices: null,
            }
        })
    }

    async createImage(url:string, id_pub:number):Promise<Image|null>{
        return this.prisma.image.create({data:{url:url, pubId:id_pub}})
    }

    async createVideo(url:string, id_pub:number):Promise<Video|null>{
        return this.prisma.video.create({data:{url:url, pubId:id_pub}})
    }

    async createPrice(id_post: number, data:PricesDto):Promise<Price|null>{
        return this.prisma.price.create({data:{
            type: data.type,
            amount: data.amount,
            add_amount: data.add_amount,
            idPub: id_post

        }})
    }
}