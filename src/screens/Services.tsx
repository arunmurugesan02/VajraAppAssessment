import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from '../components/common/Header';
import { colors, fontSize, spacing } from '../styles/colors';

// src/components/screens/Services.tsx
const Services: React.FC = () => {
  return (
    <SafeAreaView style={{flex:1}} edges={['top','right','left']}>
      <View style={styles.container}>
        <Header title="Services" />
        <View style={styles.content}>
          <Icon name="cog" size={64} color={colors.gray[400]} />
          <Text style={styles.title}>Services</Text>
          <Text style={styles.subtitle}>Manage your services</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Services;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
  },
  title: {
    fontSize: fontSize.xl,
    fontWeight: '600',
    color: colors.text.primary,
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: fontSize.md,
    color: colors.text.secondary,
    textAlign: 'center',
  },
});