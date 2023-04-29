import { Controller,Get } from "@nestjs/common";
@Controller('/')
export class apiControllers{
    @Get('/')
    getData(){
        return 'API Checking';
    }
}