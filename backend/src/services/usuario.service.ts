import { prisma } from "../prisma/client";

export class UsuarioService {

  async findUsuarioById(id: number) {
    return await prisma.usuario.findUnique({where: {id}});
  }

  async adicionarSaldo(id: number, valor: number) {
    const usuarioAtualizado = await prisma.usuario.update({
      where: { id },
      data: {
        saldoBrl: {
          increment: valor,
        },
      },
    });

    return usuarioAtualizado;
  }
}