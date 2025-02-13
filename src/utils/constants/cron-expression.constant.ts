export class CronExpressionConstant {
    public static readonly EVERY_1_SECOND = '* * * * * *';
    public static readonly EVERY_1_MINUTE = '* * * * *';
    public static readonly EVERY_5_MINUTES = '*/5 * * * *';
    public static readonly EVERY_10_MINUTES = '*/10 * * * *';
    public static readonly EVERY_15_MINUTES = '*/15 * * * *';
    public static readonly EVERY_30_MINUTES = '*/30 * * * *';
    public static readonly EVERY_1_HOUR = '0 * * * *';
    public static readonly EVERY_2_HOURS = '0 */2 * * *';
    public static readonly EVERY_3_HOURS = '0 */3 * * *';
    public static readonly EVERY_6_HOURS = '0 */6 * * *';
    public static readonly EVERY_12_HOURS = '0 */12 * * *';
    public static readonly EVERY_1_DAY = '0 0 * * *';
    public static readonly EVERY_2_DAYS = '0 0 */2 * *';
    public static readonly EVERY_3_DAYS = '0 0 */3 * *';
    public static readonly EVERY_7_DAYS = '0 0 */7 * *';
    public static readonly EVERY_14_DAYS = '0 0 */14 * *';
    public static readonly EVERY_30_DAYS = '0 0 */30 * *';
    public static readonly EVERY_1_MONTH = '0 0 1 * *';
    public static readonly EVERY_2_MONTHS = '0 0 1 */2 *';
    public static readonly EVERY_3_MONTHS = '0 0 1 */3 *';
    public static readonly EVERY_6_MONTHS = '0 0 1 */6 *';
    public static readonly EVERY_1_YEAR = '0 0 1 1 *';
}
