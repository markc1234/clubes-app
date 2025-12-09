import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ComprobanteItem } from '../comprobante_item/comprobante_item.entity';

@Entity('tipo_item')
export class TipoItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  descripcion: string;

  @OneToMany(() => ComprobanteItem, (comprobanteItem) => comprobanteItem.tipoItem)
  comprobanteItems: ComprobanteItem[];
}
