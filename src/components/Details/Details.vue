<template>
    <div class="breatwork-details">
        <div class="breatwork-details-header">Breathwork session detalies</div>
        <div class="breatwork-details-body">
            <div class="detail-item">Good Resonance:  <span> {{test.resonance.good.toFixed(0)}}%</span> </div>
            <div class="detail-item">Highest Resonance:  <span> {{test.data.HighestScore.toFixed(0)}}</span> </div>
            <div class="detail-item">Fair Resonance:  <span> {{test.resonance.fair.toFixed(0)}}%</span> </div>
            <div class="detail-item">Lowest Resonance:  <span> {{test.data.LowestScore.toFixed(0)}}</span> </div>
            <div class="detail-item">Poor Resonance:  <span> {{test.resonance.poor.toFixed(0)}}%</span> </div>
            <div class="detail-item">Breath Rate:  <span> {{test.data.Rate.toFixed(0)}}</span> </div>
        </div>
    </div>
</template>
<script>

    import './Details.scss'

    export default {
        props: ['test']
    }
</script>