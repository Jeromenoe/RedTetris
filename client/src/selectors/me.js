export const getMeInfos = state => ({
    name: state.me.name,
    score: state.me.score,
    level: state.me.level,
    rows: state.me.rows,
    hasLost: state.me.hasLost
})