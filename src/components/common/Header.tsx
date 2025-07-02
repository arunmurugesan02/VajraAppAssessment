// src/components/common/Header.tsx
import React, { useState } from 'react';
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import HeadPhone from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import imageConstants from '../../constants/imageConstants';
import { menuItems } from '../../data/mockData';
import { colors, fontSize, spacing } from '../../styles/colors';
interface HeaderProps {
  title: string;
  showMenu?: boolean;
  onMenuPress?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  title ,
  showMenu = true,
  onMenuPress,
}) => {
  const [menuVisible, setMenuVisible] = useState(false);

  const handleMenuPress = () => {
    if (onMenuPress) {
      onMenuPress();
    } else {
      setMenuVisible(true);
    }
  };

  const MenuItem = ({item}: {item: any}) => {
    const showChevron = ['Assets', 'Users', 'Report'].includes(item.name);

    return (
      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => {
          setMenuVisible(false);
        }}>
        <Icon name={item.icon} size={24} color={colors.gray[600]} />
        <Text style={styles.menuItemText}>{item.name}</Text>
        {showChevron && (
          <Icon name="chevron-down" size={20} color={colors.gray[400]} />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <>
      <View style={styles.header}>
        <FastImage
          source={imageConstants.logo}
          style={{width: 45, height: 45}}
          resizeMode={FastImage.resizeMode.contain}
        />
        <View style={styles.rightSection}>
          <TouchableOpacity style={styles.iconButton}>
            <Icon name="view-grid" size={24} color={colors.white} />
          </TouchableOpacity>
          {showMenu && (
            <TouchableOpacity
              style={styles.iconButton}
              onPress={handleMenuPress}>
              <Icon name="menu" size={24} color={colors.white} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <Modal
        visible={menuVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setMenuVisible(false)}>
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setMenuVisible(false)}>
          <View style={styles.menuContainer}>
            <View style={styles.menuHeader}>
              <View style={styles.userInfo}>
                <View style={styles.avatar}>
                  <Icon name="account" size={24} color={colors.white} />
                </View>
                <View>
                  <Text style={styles.userName}>Krishn Kumar</Text>
                  <Text style={styles.userRole}>Admin</Text>
                </View>
              </View>
              <TouchableOpacity onPress={() => setMenuVisible(false)}>
                <Icon name="close" size={24} color={colors.gray[600]} />
              </TouchableOpacity>
            </View>

            <View style={styles.branchSelector}>
              <Icon name="map-marker" size={20} color={colors.primary} />
              <Text style={styles.branchText}>Branch</Text>
              <Icon name="chevron-down" size={20} color={colors.gray[400]} />
            </View>

            <ScrollView style={styles.menuList}>
              {menuItems.map((item, index) => (
                <MenuItem key={index} item={item} />
              ))}
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  alignItems: 'center',
                  marginTop: spacing.sm,
                }}>
                <TouchableOpacity style={styles.footer}>
                  <HeadPhone name="headphones" size={30} color={'black'} />
                  <Text style={{fontSize: fontSize.lg, fontWeight: '700'}}>
                    Connect
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.footer}>
                  <Icon name="logout" size={30} color={'black'} />
                  <Text style={{fontSize: fontSize.lg, fontWeight: '700'}}>
                    Logout
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>

            <TouchableOpacity style={styles.biomedicalButton}>
              <Text style={styles.biomedicalText}>Biomedical</Text>
              <Icon name="chevron-down" size={20} color={colors.white} />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.primaryDark,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: spacing.sm,
    padding: spacing.md,
    borderRadius: 30,
    borderColor: 'black',
    borderWidth: 1,
    gap: 10,
  },
  title: {
    color: colors.white,
    fontSize: fontSize.xl,
    fontWeight: '700',
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: spacing.md,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  menuContainer: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
    flexGrow: 1,
  },
  menuHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  userName: {
    fontSize: fontSize.lg,
    fontWeight: '700',
    color: colors.text.primary,
  },
  userRole: {
    fontSize: fontSize.md,
    fontWeight: '700',
    color: colors.text.secondary,
  },
  branchSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  branchText: {
    fontSize: fontSize.lg,
    color: colors.text.primary,
    marginLeft: spacing.sm,
    flex: 1,
    fontWeight: '700',
  },
  menuList: {
    flex: 1,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  menuItemText: {
    fontSize: fontSize.lg,
    color: colors.text.primary,
    marginLeft: spacing.md,
    flex: 1,
    fontWeight: '700',
  },
  biomedicalButton: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: spacing.lg,
    padding: spacing.lg,
    borderRadius: 25,
  },
  biomedicalText: {
    color: colors.white,
    fontSize: fontSize.lg,
    fontWeight: '700',
  },
});

export default Header;
