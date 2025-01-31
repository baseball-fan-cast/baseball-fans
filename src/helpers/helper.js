export const isEmpty = (value) => {
  if (value === null || value === undefined) {
    return true;
  }

  if (Array.isArray(value)) {
    return value.length === 0;
  }

  if (typeof value === 'object') {
    return Object.keys(value).length === 0 || Object.values(value).length === 0;
  }

  return false;
};

export const getIcon = (currentTeam, id, isPlayer) => {
  const teamIcon = isPlayer
    ? `https://midfield.mlbstatic.com/v1/team/${currentTeam?.id}/spots/96`
    : `https://midfield.mlbstatic.com/v1/team/${id}/spots/96`;
  const playerIcon = isPlayer
    ? `https://img.mlbstatic.com/mlb-photos/image/upload/t_w60/t_headshot_silo/v1/people/${id}/headshot/silo/current`
    : null;

  return { icon: teamIcon, playerIcon: playerIcon };
};

export const formatDate = (currentDate) => {
  return currentDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};
