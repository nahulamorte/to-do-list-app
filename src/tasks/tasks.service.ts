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

  async findAll(userId: number, completed?: string) {
    let isCompletedFilter: boolean | undefined = undefined;

    if (completed === 'true') isCompletedFilter = true;
    if (completed === 'false') isCompletedFilter = false;

    return this.prisma.task.findMany({
      where: {
        userId: userId,
        isCompleted: isCompletedFilter,
      },
    });
  }

  async findOne(id: number, userId: number) {
    const task = await this.prisma.task.findFirst({
      where: {
        id: id,
        userId: userId, // Condición clave de seguridad
      },
    });

    if (!task) {
      throw new NotFoundException(
        `Tarea con ID ${id} no encontrada o no te pertenece`,
      );
    }

    return task;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto, userId: number) {
    await this.findOne(id, userId);

    return this.prisma.task.update({
      where: { id },
      data: updateTaskDto,
    });
  }

  async remove(id: number, userId: number) {
    await this.findOne(id, userId);

    return this.prisma.task.delete({
      where: { id },
    });
  }
}
