module 0xEFE8B36D5B2E43728CC323298626B83177803521D195CFB11E15B910E892FDDF::obligation_debts {

    use 0x1::type_name;
    use sui::tx_context;
    use 0x779B5C547976899F5474F3A5BC0DB36DDF4697AD7E5A901DB0415C2281D28162::wit_table;
    use 0xEFE8B36D5B2E43728CC323298626B83177803521D195CFB11E15B910E892FDDF::obligation;
    use 0xEFE8B36D5B2E43728CC323298626B83177803521D195CFB11E15B910E892FDDF::obligation_debts;

    friend obligation;

    struct Debt has copy, drop, store {
        amount: u64,
        borrow_index: u64,
    }
    struct ObligationDebts has drop {
        dummy_field: bool,
    }

    // NOTE: Functions are 'native' for simplicity. They may or may not be native in actuality.
 #[native_interface]
    native public(friend) fun new(a0: &mut tx_context::TxContext): wit_table::WitTable<obligation_debts::ObligationDebts, type_name::TypeName, obligation_debts::Debt>;
 #[native_interface]
    native public(friend) fun has_coin_x_as_debt(a0: &wit_table::WitTable<obligation_debts::ObligationDebts, type_name::TypeName, obligation_debts::Debt>, a1: type_name::TypeName): bool;
 #[native_interface]
    native public(friend) fun init_debt(a0: &mut wit_table::WitTable<obligation_debts::ObligationDebts, type_name::TypeName, obligation_debts::Debt>, a1: type_name::TypeName, a2: u64);
 #[native_interface]
    native public(friend) fun increase(a0: &mut wit_table::WitTable<obligation_debts::ObligationDebts, type_name::TypeName, obligation_debts::Debt>, a1: type_name::TypeName, a2: u64);
 #[native_interface]
    native public(friend) fun decrease(a0: &mut wit_table::WitTable<obligation_debts::ObligationDebts, type_name::TypeName, obligation_debts::Debt>, a1: type_name::TypeName, a2: u64);
 #[native_interface]
    native public(friend) fun accrue_interest(a0: &mut wit_table::WitTable<obligation_debts::ObligationDebts, type_name::TypeName, obligation_debts::Debt>, a1: type_name::TypeName, a2: u64): u64;
 #[native_interface]
    native public fun debt(a0: &wit_table::WitTable<obligation_debts::ObligationDebts, type_name::TypeName, obligation_debts::Debt>, a1: type_name::TypeName): (u64, u64);

}
