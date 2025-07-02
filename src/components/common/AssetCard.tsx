// src/components/common/AssetCard.tsx
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { borderRadius, colors, fontSize, spacing } from '../../styles/colors';
import { AssetCardProps } from '../../types';

const AssetCard: React.FC<AssetCardProps> = ({asset, onPress}) => {
  const getStatusColor = () => {
    switch (asset.status) {
      case 'attention':
        return colors.warning;
      case 'critical':
        return colors.error;
      default:
        return colors.primary;
    }
  };

  const getStatusIcon = () => {
    switch (asset.status) {
      case 'attention':
        return 'alert-circle';
      case 'critical':
        return 'alert';
      default:
        return 'check-circle';
    }
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.cardContent}>
        <View style={styles.assetInfo}>
          <Text style={styles.assetName}>{asset.name}</Text>
          <Text style={styles.department}>{asset.department}</Text>
          <Text style={styles.assetId}>{asset.assetId}</Text>
        </View>

        <View style={styles.statusContainer}>
          <View
            style={[styles.servicesBadge, {backgroundColor: getStatusColor()}]}>
            {asset.status === 'attention' && (
              <Icon name={getStatusIcon()} size={16} color={colors.white} />
            )}
            <Text style={styles.servicesText}>
              {asset.services.toString().padStart(2, '0')} Services
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    marginHorizontal: spacing.md,
    marginVertical: spacing.xs,
    elevation: 2,
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.md,
  },
  assetInfo: {
    flex: 1,
  },
  assetName: {
    fontSize: fontSize.lg,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  department: {
    fontSize: fontSize.md,
    color: colors.text.secondary,
    marginBottom: spacing.xs,
  },
  assetId: {
    fontSize: fontSize.sm,
    color: colors.text.secondary,
    fontFamily: 'monospace',
  },
  statusContainer: {
    alignItems: 'flex-end',
  },
  servicesBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.sm,
    minWidth: 80,
    justifyContent: 'center',
  },
  servicesText: {
    color: colors.white,
    fontSize: fontSize.sm,
    fontWeight: '600',
    marginLeft: spacing.xs,
  },
});

export default AssetCard;
