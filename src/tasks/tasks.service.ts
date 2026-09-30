import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TasksService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTaskDto: CreateTaskDto, userId: number) {
    return this.prisma.task.create({
      data: {
        ...createTaskDto,
        userId: userId,
      },
    });
  }

  findAll(completed?: string) {
    let isCompletedFilter: boolean | undefined = undefined;

    if (completed === 'true') isCompletedFilter = true;
    if (completed === 'false') isCompletedFilter = false;

    return this.prisma.task.findMany({
      where: {
        isCompleted: isCompletedFilter,
      },
    });
  }

  async findOne(id: number) {
    const task = await this.prisma.task.findUnique({
      where: { id: id },
    });

    if (!task) {
      throw new NotFoundException('Tarea no encontrada'); // NotFoundException se importa de @nestjs/common
    }
    return task;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    await this.findOne(id);

    return this.prisma.task.update({
      where: { id },
      data: updateTaskDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.task.delete({ where: { id: id } });
  }
}
