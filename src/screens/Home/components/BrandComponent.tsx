import React, {FC} from 'react';
import {Box, Checkbox, ScrollView, Text, VStack} from 'native-base';
import {Brand} from '../../../services/types';
import i18n from '../../../i18n';
import {t} from 'i18next';

type Props = {
  brands: Brand[];
  brandId: any;
  onSetBrands: (values: any) => void;
};

const BrandComponent: FC<Props> = ({brands, onSetBrands, brandId}) => {
  const locale = i18n.language;

  return (
    <ScrollView>
      <Box>
        <Text p={3} fontSize={'md'}>
          {t('All Brands')}
        </Text>
        <VStack px={6}>
          <Checkbox.Group
            value={brandId}
            onChange={values => onSetBrands(values)}>
            {brands.map((item: Brand) => (
              <Checkbox value={String(item.id)} my={2}>
                {locale === 'en' && item?.brandName}
                {locale === 'hn' && item?.brandNamehn}
                {locale === 'bn' && item?.brandNamebn}
                {locale === 'ar' && item?.brandNamear}
              </Checkbox>
            ))}
          </Checkbox.Group>
        </VStack>
      </Box>
    </ScrollView>
  );
};

export default BrandComponent;
