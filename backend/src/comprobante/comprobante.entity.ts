import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { TipoComprobante } from '../tipo_comprobante/tipo_comprobante.entity';
import { Socio } from '../socio/socio.entity';
import { ComprobanteItem } from 'src/comprobante_item/comprobante_item.entity';

@Entity('comprobante')
export class Comprobante {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '' })
  observacion: string;

  @Column()
  nro_comprobante: number;

  @Column()
  fecha_emision: Date;

  @Column('decimal')
  total: number;

  @ManyToOne(() => TipoComprobante)
  @JoinColumn({ name: 'tipo_comprobante_id' })
  tipo_comprobante: TipoComprobante;

  @ManyToOne(() => Socio)
  @JoinColumn({ name: 'socio_id' })
  socio: Socio;

  @OneToMany(() => ComprobanteItem, (comprobanteItem) => comprobanteItem.comprobante)
  comprobanteItems: ComprobanteItem[];

  @Column({ default: true })
  activo: boolean;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updated_at: Date;

  @Column({ nullable: true })
  created_by: string;

  @Column({ nullable: true })
  updated_by: string;
}
