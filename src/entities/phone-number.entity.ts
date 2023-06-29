import { CreateDateColumn, DeleteDateColumn, Entity, UpdateDateColumn } from "typeorm";
import { ColumnInt, ColumnPrimaryKeyInt, ColumnString } from "./columns";

@Entity('phone_number')
export class PhoneNumber {
    @ColumnPrimaryKeyInt()
    id: number;

    @ColumnString()
    phone: string;

    @ColumnInt()
    type_id: number;

    @CreateDateColumn({ name: "created_at" })
    createdAt: Date;

    @UpdateDateColumn({ name: "updated_at" })
    updatedAt: Date;

    @DeleteDateColumn({ name: "deleted_at" })
    deletedAt: Date;
}