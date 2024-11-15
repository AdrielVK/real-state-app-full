import { ApiProperty } from "@nestjs/swagger";
import { Decimal } from "@prisma/client/runtime/library";
import { IsArray, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { UserDto } from "src/auth";






export class TypeDto {
    @IsOptional()
    @ApiProperty()
    id?: number
    @IsNotEmpty()
    @ApiProperty()
    @IsString()
    name: string

    /*@IsOptional()
    @ApiProperty()
    properties: string;*/
}

export class FeatureDto {
    @IsOptional()
    @ApiProperty()
    id?: number

    @IsNotEmpty()
    @ApiProperty()
    @IsString()
    name: string

    @IsOptional()
    @ApiProperty()
    @IsString()
    unit: string
}

export class FeatureOfPropDto {
    @IsOptional()
    @ApiProperty()
    id?: number


    @IsOptional()
    @ApiProperty()
    @IsString()
    unit?: string

    @IsNotEmpty()
    @ApiProperty()
    @IsString()
    quantity: string

    @IsNotEmpty()
    @ApiProperty()
    featureName: string

    @IsOptional()
    @ApiProperty()
    propId?: number

}

export class FeatureToPostDto {
    @IsNotEmpty()
    @ApiProperty()
    quantity?: string

    @IsNotEmpty()
    @ApiProperty()
    featureName: string

    @IsNotEmpty()
    @ApiProperty()
    propId?: number
}

export class PropertyDto{

    @IsNotEmpty()
    @ApiProperty()
    @IsString()
    province:string

    @IsNotEmpty()
    @ApiProperty()
    @IsString()
    city: string

    @IsNotEmpty()
    @ApiProperty()
    @IsString()
    street: string

    @ApiProperty()
    @IsOptional()
    streetId: string

    @IsNotEmpty()
    latitude:number
    @IsNotEmpty()
    longitude:number
   
    @ApiProperty()
    @IsOptional()
    addId: string

    @IsNotEmpty()
    @ApiProperty()
    @IsString()
    state: string
    @IsNotEmpty()
    @ApiProperty()
    typeName: string

    @IsNotEmpty()
    @ApiProperty()
    userId:number   
}


export class CreatePropertyDto {
    @IsNotEmpty()
    @ApiProperty()
    @IsString()
    typeName: string
    @IsNotEmpty()
    @ApiProperty()
    @IsString()
    province: string
    @IsNotEmpty()
    @ApiProperty()
    @IsString()
    city: string
    @IsNotEmpty()
    @ApiProperty()
    @IsString()
    street: string
    @IsString()
    @ApiProperty()
    @IsOptional()
    streetId?: string
    @IsString()
    @ApiProperty()
    @IsOptional()
    addId?:string

    @IsNotEmpty()
    latitude:number
    @IsNotEmpty()
    longitude:number

    @IsNotEmpty()
    @ApiProperty()
    @IsArray()
    features:FeatureToPostDto[]
}

export class OperationDto{
    @IsOptional()
    @ApiProperty()
    id?:number

    @IsNotEmpty()
    @ApiProperty()
    @IsString()
    name:string
}

export class PublicationDto {

    @IsNotEmpty()
    @ApiProperty()
    user: UserDto

    @IsOptional()
    @ApiProperty()
    id?: number

    @IsNotEmpty()
    @ApiProperty()
    @IsString()
    title: string

    @IsNotEmpty()
    @ApiProperty()
    @IsString()
    description: string

    @IsNotEmpty()
    @ApiProperty()
    @IsString()
    status: string

    @IsNotEmpty()
    @ApiProperty()
    @IsString()
    uid: string

    @IsNotEmpty()
    @ApiProperty()
    property: CreatePropertyDto


    @IsOptional()
    @ApiProperty()
    @IsArray()
    images: ImageDto[]

    @IsOptional()
    @ApiProperty()
    @IsArray()
    videos: VideoDto[]

    @IsNotEmpty()
    @ApiProperty()
    operation: OperationDto

    @IsNotEmpty()
    @ApiProperty()
    @IsArray()
    prices: PricesDto[]
}

export class ImageDto{
    @IsOptional()
    @ApiProperty()
    id?:number

    @IsNotEmpty()
    @ApiProperty()
    @IsString()
    url:string
}

export class VideoDto{
    @IsOptional()
    @ApiProperty()
    id?:number

    @IsNotEmpty()
    @ApiProperty()
    @IsString()
    url:string
}



export class PricesDto{
    @IsOptional()
    @ApiProperty()
    id?:number

    

    @IsNotEmpty()
    @ApiProperty()
    @IsString()
    type: "FIXED" | "RANGE"

    @IsNotEmpty()
    @ApiProperty()
    amount: number

    @IsOptional()
    @ApiProperty()
    @IsString()
    add_amount?: number
}

export class CreatePublicationDto {

    @IsNotEmpty()
    @ApiProperty()
    @IsString()
    title: string

    @IsNotEmpty()
    @ApiProperty()
    @IsString()
    description: string

    @IsNotEmpty()
    @ApiProperty()
    propertyId: number


    @IsOptional()
    @ApiProperty()
    @IsArray()
    images: Express.Multer.File[]

    @IsOptional()
    @ApiProperty()
    @IsArray()
    videos: Express.Multer.File[]

    @IsNotEmpty()
    @ApiProperty()
    operationName: string

    @IsNotEmpty()
    @ApiProperty()
    @IsArray()
    prices: PricesDto[]
}