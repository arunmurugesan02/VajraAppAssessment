// src/components/screens/Dashboard.tsx
import React from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AssetCard from '../components/common/AssetCard';
import Header from '../components/common/Header';
import SemiCircularProgress from '../components/common/SemiCircularProgress';
import StatCard from '../components/common/StatCard';
import { assetsData, hospitalData } from '../data/mockData';
import { borderRadius, colors, fontSize, spacing } from '../styles/colors';
import { Asset } from '../types';

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState<'Assets' | 'Incidents'>('Assets');

  const renderAssetItem = ({item}: {item: Asset}) => (
    <AssetCard asset={item} onPress={() => console.log('Asset pressed:', item.id)} />
  );

  const HospitalCard = () => (
    <View style={styles.hospitalCard}>
      <View style={styles.hospitalHeader}>
        <View>
          <Text style={styles.hospitalName}>{hospitalData.name}</Text>
          <Text style={styles.branchName}>{hospitalData.branchName}</Text>
        </View>
        <Icon name="check-circle" size={40} color={colors.white} />
      </View>
      <View style={styles.statusContainer}>
        <Text style={styles.statusText}>All Assets are in order</Text>
        <Text style={styles.timeStamp}>{hospitalData.timeStamp}</Text>
      </View>
    </View>
  );

  const StatsRow = () => (
    <View style={styles.statsRow}>
      <StatCard title="Dept." value={hospitalData.departments} />
      <StatCard title="Assets" value={hospitalData.totalAssets} />
      <StatCard title="Check In" value={hospitalData.checkIns} />
    </View>
  );

  const TabSelector = () => (
    <View style={styles.tabContainer}>
      {['Assets', 'Incidents'].map(tab => (
        <TouchableOpacity
          key={tab}
          style={[styles.tab, activeTab === tab ? styles.activeTab : styles.inActiveTab]}
          onPress={() => setActiveTab(tab as 'Assets' | 'Incidents')}>
          <Text
            style={[styles.tabText, activeTab === tab && styles.activeTabText]}>  
            {tab}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const IncidentsSection = () => (
    <View style={styles.incidentsMainSection}>
      <View style={styles.incidentsHeaderSection}>
        <Text style={styles.sectionTitle}>Incidents</Text>
        <TouchableOpacity>
          <Icon name="arrow-right" size={20} color={colors.text.primary} />
        </TouchableOpacity>
      </View>
      <Text style={styles.incidentsSubtitle}>No. of raised incidents</Text>
      <View style={styles.incidentsStats}>
        <View style={styles.incidentStatItem}>
          <Text style={styles.incidentNumber}>04</Text>
          <Text style={styles.incidentLabel}>Open</Text>
        </View>
        <View style={styles.incidentStatItem}>
          <Text style={[styles.incidentNumber, {color: colors.text.secondary}]}>06</Text>
          <Text style={styles.incidentLabel}>Closed</Text>
        </View>
      </View>
      <View style={styles.incidentProgressContainer}>
        <SemiCircularProgress
          size={160}
          strokeWidth={14}
          percentage={100}
          value="256"
          color="#000000"
          backgroundColor="#D3D3D3"
        />
      </View>
      <View style={[styles.serviceDue , {marginTop:spacing.xl}]}>  
        <Text style={[styles.dueText, {color: colors.warning}]}></Text>
        <TouchableOpacity style={styles.requestButton}>
          <Text style={styles.requestButtonText}>Add</Text>
          <Icon name="plus" size={16} color={colors.white} />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderServiceCard = (title: string, percentage: number, value: string, stats: {label: string, color: string}[], dueText: string, dueColor: string) => (
    <View style={styles.serviceCard}>
      <View style={styles.serviceHeader}>
        <Text style={styles.serviceTitle}>{title}</Text>
        <TouchableOpacity>
          <Icon name="arrow-right" size={20} color={colors.text.primary} />
        </TouchableOpacity>
      </View>
      <View style={styles.serviceMainContent}>
        <View style={styles.serviceProgressSection}>
          <SemiCircularProgress
            size={160}
            strokeWidth={14}
            percentage={percentage}
            value={value}
            color="#000000"
            backgroundColor="#D3D3D3"
          />
        </View>
        <View style={styles.serviceStatsContainer}>
          {stats.map((stat, idx) => (
            <View key={idx} style={styles.serviceStatItem}>
              <View style={[styles.serviceStatDot, {backgroundColor: stat.color}]} />
              <Text style={styles.serviceStatText}>{stat.label}</Text>
            </View>
          ))}
        </View>
      </View>
      <View style={styles.serviceDue}>
        <Text style={[styles.dueText, {color: dueColor}]}>{dueText}</Text>
        <TouchableOpacity style={styles.requestButton}>
          <Text style={styles.requestButtonText}>Request</Text>
          <Icon name="plus" size={16} color={colors.white} />
        </TouchableOpacity>
      </View>
    </View>
  );

  const ServicesSection = () => (
    <View style={styles.servicesSection}>
      <Text style={styles.sectionTitle}>Services</Text>
      <View style={styles.servicesContainer}>
        <Text style={styles.servicesSubtitle}>No. of services</Text>
        <View style={styles.servicesStatus}>
          <Text style={styles.attentionText}>01 Dept needs attention</Text>
        </View>
      </View>
      <View style={[styles.separator, {margin: 0, marginBottom: spacing.xl}]} />
      <View style={styles.chartContainer}>
        {["Lab...", "Blood..", "Lab..", "Press.."].map((label, i) => (
          <View key={i} style={styles.chartItem}>
            <View style={[styles.chartBar, i === 1 && styles.chartBarActive]} />
            <Text style={styles.chartLabel}>{label}</Text>
          </View>
        ))}
      </View>
      <View style={[styles.separator, {marginVertical: spacing.xl}]} />
      <View style={{alignItems: 'flex-end'}}>
        <TouchableOpacity style={styles.fab}>
          <Text style={styles.fabText}>Add</Text>
          <Icon name="plus" size={20} color={colors.white} />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderTabContent = () => (
    activeTab === 'Assets' ? (
      <>
        <ServicesSection />
        <View style={styles.assetsSection}>
          <FlatList
            data={assetsData}
            renderItem={renderAssetItem}
            keyExtractor={item => item.id}
            scrollEnabled={false}
          />
          <TouchableOpacity style={styles.viewAllButton}>
            <Text style={styles.viewAllText}>All Services</Text>
            <Icon name="arrow-right" size={20} color={colors.white} />
          </TouchableOpacity>
        </View>
      </>
    ) : (
      <>
        <IncidentsSection />
        {renderServiceCard('Calibrations', 100, '256', [
          {label: '247 Calibrated', color: colors.text.primary},
          {label: '12 Not Calibrated', color: colors.text.secondary},
          {label: '38 Not Required', color: colors.gray[400]},
        ], '04 Due', colors.warning)}
        {renderServiceCard('AMC / CMC', 99, '256', [
          {label: '213 AMC', color: colors.text.primary},
          {label: '43 CMC', color: colors.text.secondary},
        ], '00 Due', colors.text.secondary)}
        {renderServiceCard('Warranty', 100, '256', [
          {label: '267 Total', color: colors.text.primary},
          {label: '10 Requested', color: colors.text.secondary},
          {label: '07 Expires soon', color: colors.warning},
        ], '07 Due', colors.warning)}
      </>
    )
  );

  return (
    <SafeAreaView style={{flex: 1}} edges={['top', 'left', 'right']}>
      <View style={styles.container}>
        <Header title="Vajra" />
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <HospitalCard />
          <StatsRow />
          <View style={styles.separator} />
          <TabSelector />
          {renderTabContent()}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  content: {
    flex: 1,
  },
  separator: {
    height: 1,
    backgroundColor: colors.line,
    width: '90%',
    margin: spacing.md,
  },

  hospitalCard: {
    backgroundColor: colors.primary,
    margin: spacing.md,
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
  },
  hospitalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  hospitalName: {
    color: colors.white,
    fontSize: fontSize.xl,
    fontWeight: '700',
  },
  branchName: {
    color: colors.white,
    fontSize: fontSize.md,
    opacity: 0.9,
    fontWeight: '700',
  },
  statusContainer: {
    marginTop: spacing.sm,
  },
  statusText: {
    color: colors.white,
    fontSize: fontSize.md,
    fontWeight: '700',
  },
  timeStamp: {
    color: colors.white,
    fontSize: fontSize.sm,
    opacity: 0.8,
    marginTop: spacing.xs,
    fontWeight: '700',
  },
  statsRow: {
    flexDirection: 'row',
    marginHorizontal: spacing.md,
    borderRadius: borderRadius.lg,
    elevation: 2,
    gap: 10,
  },
  divider: {
    width: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.md,
  },
  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: spacing.md,
    marginBottom: spacing.md,
  },
  tab: {
    flex: 1,
    paddingVertical: spacing.md,
    alignItems: 'center',
    borderRadius: 25,
    marginHorizontal: spacing.xs,
  },
  activeTab: {
    backgroundColor: colors.primary,
  },
  inActiveTab: {
    borderWidth: 1,
    borderColor: 'black',
  },
  tabText: {
    fontSize: fontSize.md,
    color: colors.text.secondary,
    fontWeight: '700',
  },
  activeTabText: {
    color: colors.white,
  },
  servicesSection: {
    backgroundColor: colors.white,
    marginHorizontal: spacing.md,
    marginBottom: spacing.md,
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: fontSize.lg,
    fontWeight: '700',
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  servicesContainer: {
    marginBottom: spacing.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  servicesSubtitle: {
    fontSize: fontSize.md,
    color: colors.text.secondary,
    marginBottom: spacing.xs,
    fontWeight: '700',
  },
  servicesStatus: {},
  attentionText: {
    fontSize: fontSize.sm,
    color: colors.warning,
    fontWeight: '700',
  },
  chartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    height: 60,
  },
  chartBar: {
    width: 40,
    height: 30,
    backgroundColor: colors.gray[300],
    borderRadius: borderRadius.sm,
  },
  chartBarActive: {
    height: 50,
    backgroundColor: colors.warning,
  },
  assetsSection: {
    marginBottom: spacing.xl,
  },
  viewAllButton: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: spacing.md,
    marginTop: spacing.md,
    padding: spacing.lg,
    borderRadius: borderRadius.md,
  },
  chartItem: {
    alignItems: 'center',
  },
  chartLabel: {
    marginTop: 4,
    fontSize: 12,
    color: colors.text.secondary,
    fontWeight: '700',
  },

  viewAllText: {
    color: colors.white,
    fontSize: fontSize.lg,
    fontWeight: '700',
  },
  fab: {
    width: '30%',
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: 25,
    elevation: 8,
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
  fabText: {
    color: colors.white,
    fontSize: fontSize.md,
    fontWeight: '700',
    marginRight: spacing.sm,
  },

  // Incidents Tab Styles
  incidentsMainSection: {
    backgroundColor: colors.white,
    marginHorizontal: spacing.md,
    marginBottom: spacing.md,
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
    elevation: 2,
  },
  incidentsHeaderSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  incidentsSubtitle: {
    fontSize: fontSize.sm,
    color: colors.text.secondary,
    marginBottom: spacing.md,
    fontWeight: '500',
  },
  incidentsStats: {
    flexDirection: 'row',
    marginBottom: spacing.lg,
    justifyContent: 'space-between',
  },
  incidentStatItem: {
    marginRight: spacing.xl,
  },
  incidentNumber: {
    fontSize: fontSize.xl,
    fontWeight: '700',
    color: colors.warning,
  },
  incidentLabel: {
    fontSize: fontSize.sm,
    color: colors.text.secondary,
    marginTop: spacing.xs,
  },
  incidentProgressContainer: {
    alignItems: 'center',
  },

  addButton: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: spacing.md,
    marginBottom: spacing.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: 25,
    alignSelf: 'flex-end',
    minWidth: 100,
  },
  addButtonText: {
    color: colors.white,
    fontSize: fontSize.md,
    fontWeight: '700',
    marginRight: spacing.sm,
  },

  serviceCard: {
    backgroundColor: colors.white,
    marginHorizontal: spacing.md,
    marginBottom: spacing.md,
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
    elevation: 2,
  },
  serviceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  serviceTitle: {
    fontSize: fontSize.lg,
    fontWeight: '700',
    color: colors.text.primary,
  },
  serviceMainContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  serviceProgressSection: {
    marginRight: spacing.xl,
  },
  serviceStatsContainer: {
    flex: 1,
  },
  serviceStatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  serviceStatDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: spacing.md,
  },
  serviceStatText: {
    fontSize: fontSize.md,
    color: colors.text.primary,
    fontWeight: '600',
  },
  progressNumber: {
    fontSize: fontSize.xl,
    fontWeight: '700',
    color: colors.text.primary,
  },
  serviceDue: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.gray[200],
  },
  dueText: {
    fontSize: fontSize.lg,
    fontWeight: '700',
  },
  requestButton: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: 25,
  },
  requestButtonText: {
    color: colors.white,
    fontSize: fontSize.md,
    fontWeight: '700',
    marginRight: spacing.sm,
  },

  // Circular Progress Styles
  circularProgress: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  circularProgressBackground: {
    position: 'absolute',
  },
  circularProgressFill: {
    position: 'absolute',
  },
  circularProgressContent: {
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
});

export default Dashboard;
