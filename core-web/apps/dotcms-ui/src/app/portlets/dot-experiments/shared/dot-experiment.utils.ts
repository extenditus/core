import {
    DEFAULT_VARIANT_ID,
    DotResultDate,
    ExperimentChartDatasetColorsVariants,
    LineChartColorsProperties,
    PROP_NOT_FOUND,
    TIME_14_DAYS,
    TIME_90_DAYS
} from '@dotcms/dotcms-models';

export const orderVariants = (arrayToOrder: Array<string>): Array<string> => {
    const index = arrayToOrder.indexOf(DEFAULT_VARIANT_ID);
    if (index > -1) {
        arrayToOrder.splice(index, 1);
    }

    arrayToOrder.unshift(DEFAULT_VARIANT_ID);

    return arrayToOrder;
};

export const getParsedChartData = (data: Record<string, DotResultDate>): number[] => {
    return Object.values(data).map((day) => day.multiBySession);
};

export const getPropertyColors = (index: number): LineChartColorsProperties => {
    return ExperimentChartDatasetColorsVariants[index];
};

/**
 * Process the config properties that comes form the BE as days,
 * return the object with the values in milliseconds
 * @param configProps
 *
 * @private
 */
export const processExperimentConfigProps = (
    configProps: Record<string, string>
): Record<string, number> => {
    const config: Record<string, number> = {};

    config.EXPERIMENTS_MIN_DURATION =
        configProps.EXPERIMENTS_MIN_DURATION === PROP_NOT_FOUND
            ? TIME_14_DAYS
            : daysToMilliseconds(+configProps.EXPERIMENTS_MIN_DURATION);
    config.EXPERIMENTS_MAX_DURATION =
        configProps.EXPERIMENTS_MAX_DURATION === PROP_NOT_FOUND
            ? TIME_90_DAYS
            : daysToMilliseconds(+configProps.EXPERIMENTS_MAX_DURATION);

    return config;
};

export const daysToMilliseconds = (days: number): number => {
    return days * 24 * 60 * 60 * 1000;
};