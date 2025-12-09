import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Comprobante } from '../comprobante/comprobante.entity';
import { TipoItem } from '../tipo_item/tipo_item.entity';

@Entity('comprobante_item')
export class ComprobanteItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Comprobante, (comprobante) => comprobante.comprobanteItems, { nullable: false })
  comprobante: Comprobante;

  @ManyToOne(() => TipoItem, (tipoItem) => tipoItem.comprobanteItems, { nullable: false })
  tipoItem: TipoItem;

  @Column({ type: 'varchar', length: 255, nullable: true })
  descripcion: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  total: number;

  @Column({ type: 'int', nullable: true })
  cantidad: number;

  @Column({ type: 'boolean', default: true })
  activo: boolean;
}
