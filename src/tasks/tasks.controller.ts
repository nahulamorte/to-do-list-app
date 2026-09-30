import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  Request
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { AuthGuard } from '../auth/guards/auth.guard';

@UseGuards(AuthGuard)
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto, @Request() req: any) {
    const userId = req.user.sub;
    return this.tasksService.create(createTaskDto, userId);
  }

  @Get()
  findAll(@Request() req: any, @Query('completed') completed?: string) {
    const userId = req.user.sub;
    return this.tasksService.findAll(userId, completed);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req: any) {
    const userId = req.user.sub;
    return this.tasksService.findOne(+id, userId); // Pasamos ambos IDs
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
    @Request() req: any,
  ) {
    const userId = req.user.sub;
    return this.tasksService.update(+id, updateTaskDto, userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req: any) {
    const userId = req.user.sub;
    return this.tasksService.remove(+id, userId);
  }
}
