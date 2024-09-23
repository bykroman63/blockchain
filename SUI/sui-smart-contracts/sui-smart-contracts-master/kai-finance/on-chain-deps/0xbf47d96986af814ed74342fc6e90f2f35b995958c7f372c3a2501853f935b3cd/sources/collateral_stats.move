module 0xEFE8B36D5B2E43728CC323298626B83177803521D195CFB11E15B910E892FDDF::collateral_stats {

    use 0x1::type_name;
    use sui::tx_context;
    use 0x779B5C547976899F5474F3A5BC0DB36DDF4697AD7E5A901DB0415C2281D28162::wit_table;
    use 0xEFE8B36D5B2E43728CC323298626B83177803521D195CFB11E15B910E892FDDF::collateral_stats;
    use 0xEFE8B36D5B2E43728CC323298626B83177803521D195CFB11E15B910E892FDDF::market;

    friend market;

    struct CollateralStats has drop {
        dummy_field: bool,
    }
    struct CollateralStat has copy, store {
        amount: u64,
    }

    // NOTE: Functions are 'native' for simplicity. They may or may not be native in actuality.
    native public(friend) fun new(a0: &mut tx_context::TxContext): wit_table::WitTable<collateral_stats::CollateralStats, type_name::TypeName, collateral_stats::CollateralStat>;
    native public(friend) fun init_collateral_if_none(a0: &mut wit_table::WitTable<collateral_stats::CollateralStats, type_name::TypeName, collateral_stats::CollateralStat>, a1: type_name::TypeName);
    native public(friend) fun increase(a0: &mut wit_table::WitTable<collateral_stats::CollateralStats, type_name::TypeName, collateral_stats::CollateralStat>, a1: type_name::TypeName, a2: u64);
    native public(friend) fun decrease(a0: &mut wit_table::WitTable<collateral_stats::CollateralStats, type_name::TypeName, collateral_stats::CollateralStat>, a1: type_name::TypeName, a2: u64);
    native public fun collateral_amount(a0: &wit_table::WitTable<collateral_stats::CollateralStats, type_name::TypeName, collateral_stats::CollateralStat>, a1: type_name::TypeName): u64;

}
