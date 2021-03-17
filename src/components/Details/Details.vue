<template>
    <div class="breatwork-details">
        <div class="breatwork-details-header">Breathwork session detalies</div>
        <div class="breatwork-details-body">
            <div class="detail-item">Good Resonance:  <span> 100%</span> </div>
            <div class="detail-item">Highest Resonance:  <span> 97</span> </div>
            <div class="detail-item">Fair Resonance:  <span> 0%</span> </div>
            <div class="detail-item">Mean Resonance:  <span> 95</span> </div>
            <div class="detail-item">Poor Resonance:  <span> 0%</span> </div>
            <div class="detail-item">Lowest Resonance:  <span> 91</span> </div>
            <div class="detail-item">Breath Rate:  <span> 6</span> </div>
        </div>
    </div>
</template>
<script>

    import './Details.scss'

    export default {
        props: ['data']
    }
</script>