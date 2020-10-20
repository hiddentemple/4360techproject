import {Body, Controller, Delete, Get, Param, Post, Put} from "@nestjs/common";
import {
    CreateContactRequest,
    CreateContactResponse,
    GetAllContactsResponse,
    GetContactResponse,
    UpdateContactRequest,
    UpdateContactResponse
} from "@hiddentemple/api-interfaces";
import {ContactService} from "../services/contact.service";
import {ContactEntity} from "../../db/entities/contact.entity";


@Controller('contact')
export class ContactController {

    constructor(private contactService: ContactService) {}

    @Get()
    async getAll(): Promise<GetAllContactsResponse> {
        const contacts: ContactEntity[] = await this.contactService.getAll();
        return {contacts};
    }

    @Get(':id')
    async getOne(@Param() id: string): Promise<GetContactResponse> {
        const contact: ContactEntity = await this.contactService.getById(id);
        return {contact};
    }

    @Post()
    async createOne(@Body() dto: CreateContactRequest): Promise<CreateContactResponse> {
        const contact: ContactEntity = await this.contactService.create(dto);
        return {contact}
    }

    /**
     * This method **overwrites** a contact. The service will delete all prior emails/phones and then replace them with
     * those found in this request.
     */
    @Put(':id')
    async updateOne(@Param() id: string, @Body() dto: UpdateContactRequest): Promise<UpdateContactResponse> {
        const contact: ContactEntity = await this.contactService.update(id, dto);
        return {contact}
    }

    @Delete(':id')
    async deleteOne(@Param() id: string): Promise<any> {
        return this.contactService.delete(id)
    }
}