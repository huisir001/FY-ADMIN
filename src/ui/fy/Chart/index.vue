<!--
 * @Description: 注册
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2022-04-18 11:12:31
 * @LastEditTime: 2022-04-18 15:46:11
-->
<template>
    <ECharts class="chart" :option="option" :autoresize="true" :loading="loading" />
</template>

<script lang="ts">
import { use } from 'echarts/core'
// 按需引入 ECharts 模块
import { SVGRenderer } from 'echarts/renderers'
import {
    BarChart,
    LineChart,
    PieChart,
    RadarChart,
    GaugeChart,
    ScatterChart,
    MapChart,
} from 'echarts/charts'
import {
    TitleComponent,
    TooltipComponent,
    TimelineComponent,
    AriaComponent,
    AxisPointerComponent,
    DataZoomComponent,
    DataZoomInsideComponent,
    DataZoomSliderComponent,
    GeoComponent,
    LegendComponent,
    MarkAreaComponent,
    MarkLineComponent,
    MarkPointComponent,
    RadarComponent,
    ToolboxComponent,
    VisualMapComponent,
} from 'echarts/components'

use([
    SVGRenderer,
    BarChart,
    LineChart,
    PieChart,
    RadarChart,
    GaugeChart,
    ScatterChart,
    MapChart,
    TitleComponent,
    TooltipComponent,
    TimelineComponent,
    AriaComponent,
    AxisPointerComponent,
    DataZoomComponent,
    DataZoomInsideComponent,
    DataZoomSliderComponent,
    GeoComponent,
    LegendComponent,
    MarkAreaComponent,
    MarkLineComponent,
    MarkPointComponent,
    RadarComponent,
    ToolboxComponent,
    VisualMapComponent,
])

export default {
    name: 'Chart',
}
</script>

<script lang="ts" setup>
import { provide, ref, PropType } from 'vue'
import { THEME_KEY } from 'vue-echarts'
import ECharts from 'vue-echarts'

const props = defineProps({
    theme: {
        type: String as PropType<'light' | 'dark'>,
        default: 'light',
    },
    loading: {
        type: Boolean,
        default: false,
    },
    option: {
        type: Object,
        default: () => ({}),
    },
})

// 主题配置
provide(THEME_KEY, props.theme)
</script>

<style scoped lang="scss">
.chart {
    width: 100%;
    height: 100%;
}
</style>